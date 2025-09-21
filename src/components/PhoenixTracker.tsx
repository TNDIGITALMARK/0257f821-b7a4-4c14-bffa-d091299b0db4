"use client";

import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    __PHOENIX_TRACKING__?: {
      enableSelection: () => void;
      disableSelection: () => void;
    };
    __phoenixTrackingStateFromParent?: boolean;
  }
}

/**
 * Phoenix Tracking Client Component
 * This component handles all client-side tracking functionality
 * while keeping the layout as a Server Component.
 * 
 * Respects URL parameter ?phoenix_tracking=disabled for toggle control.
 */
export function PhoenixTracker() {
  // State to track if we've received tracking state from API
  const [hasReceivedApiResponse, setHasReceivedApiResponse] = useState(false);
  const [trackingStateFromApi, setTrackingStateFromApi] = useState<boolean | null>(null);
  
  // State for project info received from parent
  const [projectInfo, setProjectInfo] = useState<{projectId: string, userId: string} | null>(null);

  // Extract project ID and user ID from URL, environment, or postMessage
  const getProjectInfo = () => {
    // If we received project info from parent, use that
    if (projectInfo) {
      return projectInfo;
    }

    // Try to extract from subdomain (e.g., 0257f821-b7a4-4c14-bffa-d091299b0db.vercel.app)
    const hostname = window.location.hostname;
    // Match UUID pattern: 8-4-4-4-12 hex characters separated by hyphens
    const projectIdMatch = hostname.match(/^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/);
    const projectId = projectIdMatch ? projectIdMatch[1] : 'unknown';
    
    return {
      projectId,
      userId: (window as any).__PHOENIX_USER_ID__ || 'unknown'
    };
  };

  // API call to get tracking state
  const fetchTrackingState = useCallback(async () => {
    try {
      const { projectId, userId } = getProjectInfo();
      
      if (projectId === 'unknown' || userId === 'unknown') {
        console.log('🎯 PhoenixTracker: Missing project/user info, falling back to URL parameter');
        return null;
      }

      // Make API call to get tracking state using public endpoint
      const phoenixEngineUrl = process.env.NEXT_PUBLIC_PHOENIX_ENGINE_URL || 'http://localhost:3001';
      const response = await fetch(`${phoenixEngineUrl}/api/trackingIframe/public/getTrackingState/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn('Failed to fetch tracking state from API');
        return null;
      }

      const result = await response.json();
      console.log('🎯 PhoenixTracker: Received tracking state from API:', result);
      
      if (result.success) {
        setTrackingStateFromApi(result.trackingEnabled);
        setHasReceivedApiResponse(true);
        return result.trackingEnabled;
      }
    } catch (error) {
      console.warn('🎯 PhoenixTracker: Error fetching tracking state:', error);
    }
    
    return null;
  }, []);
  
  // Check URL parameter BEFORE initializing state, but also query API
  const getInitialTrackingState = () => {
    if (typeof window !== 'undefined') {
      // First check URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const phoenixTrackingParam = urlParams.get('phoenix_tracking');
      
      if (phoenixTrackingParam === 'disabled') {
        console.log('🎯 PhoenixTracker: Tracking disabled via URL parameter');
        setHasReceivedApiResponse(true); // URL parameter counts as definitive
        return false;
      }
      
      console.log('🎯 PhoenixTracker: Initial state check:', {
        phoenixTrackingParam,
        url: window.location.href,
        inIframe: window.parent !== window
      });
      
      // If not in iframe (standalone), fetch from API
      if (window.parent === window) {
        fetchTrackingState();
        return false; // Start disabled until API responds
      }
      
      // If in iframe, also fetch from API
      fetchTrackingState();
      return false; // Start disabled until API responds
    }
    return false; // Default to disabled
  };
  
  const [shouldLoadTracking, setShouldLoadTracking] = useState(getInitialTrackingState);

  // Function to check URL parameters AND listen for parent messages
  const checkTrackingState = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const phoenixTrackingParam = urlParams.get('phoenix_tracking');
    
    // Check if tracking is explicitly disabled via URL
    const isTrackingDisabled = phoenixTrackingParam === 'disabled';
    
    console.log('🎯 PhoenixTracker: Checking tracking state:', {
      phoenixTrackingParam,
      isTrackingDisabled,
      url: window.location.href
    });

    if (isTrackingDisabled) {
      console.log('🚫 PhoenixTracker: Tracking disabled via URL parameter');
      setShouldLoadTracking(false);
    } else {
      console.log('✅ PhoenixTracker: Tracking enabled (no disable parameter found)');
      setShouldLoadTracking(true);
    }
  }, []);

  // Listen for messages from parent frame to control tracking state and receive project info
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'phoenix-toggle-tracking') {
        const enabled = event.data.enabled;
        console.log('🎯 PhoenixTracker: Received tracking toggle from parent:', enabled);
        setHasReceivedApiResponse(true);
        setShouldLoadTracking(enabled);
      } else if (event.data && event.data.type === 'phoenix-tracking-state-response') {
        const enabled = event.data.enabled;
        console.log('🎯 PhoenixTracker: Received tracking state response from parent:', enabled);
        setHasReceivedApiResponse(true);
        setShouldLoadTracking(enabled);
      } else if (event.data && event.data.type === 'phoenix-project-info') {
        const { projectId, userId } = event.data;
        console.log('🎯 PhoenixTracker: Received project info from parent:', { projectId, userId });
        setProjectInfo({ projectId, userId });
        // Immediately fetch tracking state with the new project info
        fetchTrackingState();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchTrackingState]);

  // Check on mount and set up periodic API checks
  useEffect(() => {
    checkTrackingState();
    
    // Set up periodic API checks for tracking state changes
    const intervalId = setInterval(() => {
      fetchTrackingState();
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [checkTrackingState, fetchTrackingState]);

  // Effect to respond to API tracking state changes
  useEffect(() => {
    if (trackingStateFromApi !== null) {
      console.log('🎯 PhoenixTracker: API state changed:', trackingStateFromApi);
      setShouldLoadTracking(trackingStateFromApi);
    }
  }, [trackingStateFromApi]);

  useEffect(() => {
    // CRITICAL: Always check URL parameter first, regardless of API communication
    const urlParams = new URLSearchParams(window.location.search);
    const phoenixTrackingParam = urlParams.get('phoenix_tracking');
    
    if (phoenixTrackingParam === 'disabled') {
      console.log('🚫 PhoenixTracker: FORCE DISABLED by URL parameter - blocking all tracking');
      
      // Disable tracking if it was previously enabled
      if (window.__PHOENIX_TRACKING__) {
        window.__PHOENIX_TRACKING__.disableSelection();
      }
      
      // Remove any existing tracking assets
      const existingLink = document.querySelector('#phoenix-tracking-styles');
      const existingScript = document.querySelector('#phoenix-tracking-script');
      if (existingLink) existingLink.remove();
      if (existingScript) existingScript.remove();
      
      return; // BLOCK ALL TRACKING
    }
    
    // If we haven't received API response yet, wait
    if (!hasReceivedApiResponse) {
      console.log('🎯 PhoenixTracker: Waiting for API response before loading tracking...');
      return;
    }
    
    if (!shouldLoadTracking) {
      console.log('🚫 PhoenixTracker: Skipping tracking load - disabled by API');
      
      // Disable tracking if it was previously enabled
      if (window.__PHOENIX_TRACKING__) {
        window.__PHOENIX_TRACKING__.disableSelection();
      }
      return;
    }

    console.log('🎯 PhoenixTracker: Loading tracking assets (enabled by API)...');

    // Check if assets already exist before adding them
    let linkExists = document.querySelector('#phoenix-tracking-styles');
    if (!linkExists) {
      // Load tracking styles dynamically
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/phoenix-tracking.css';
      link.id = 'phoenix-tracking-styles';
      document.head.appendChild(link);
      console.log('✅ PhoenixTracker: Added tracking styles');
    } else {
      console.log('ℹ️ PhoenixTracker: Tracking styles already loaded');
    }

    let scriptExists = document.querySelector('#phoenix-tracking-script');
    if (!scriptExists) {
      // Load tracking script dynamically
      const script = document.createElement('script');
      script.src = '/phoenix-tracking.js';
      script.async = true;
      script.id = 'phoenix-tracking-script';
      document.body.appendChild(script);
      console.log('✅ PhoenixTracker: Added tracking script');
    } else {
      console.log('ℹ️ PhoenixTracker: Tracking script already loaded');
      
      // If script exists and tracking should be enabled, re-enable selection
      if (window.__PHOENIX_TRACKING__) {
        window.__PHOENIX_TRACKING__.enableSelection();
      }
    }

    // Cleanup function
    return () => {
      // Remove tracking assets when component unmounts or tracking is disabled
      const existingLink = document.querySelector('#phoenix-tracking-styles');
      const existingScript = document.querySelector('#phoenix-tracking-script');
      
      if (existingLink) {
        existingLink.remove();
        console.log('🧹 PhoenixTracker: Removed tracking styles');
      }
      if (existingScript) {
        existingScript.remove();
        console.log('🧹 PhoenixTracker: Removed tracking script');
      }
    };
  }, [shouldLoadTracking, hasReceivedApiResponse]);

  // Listen for URL changes and iframe navigation
  useEffect(() => {
    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', checkTrackingState);
    
    // CRITICAL: Also listen for iframe src changes via MutationObserver
    // This catches when the parent frame changes the iframe src
    const observer = new MutationObserver(() => {
      checkTrackingState();
    });
    
    observer.observe(document, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    });
    
    // Also periodically check URL in case we missed changes
    const intervalCheck = setInterval(checkTrackingState, 1000);
    
    return () => {
      window.removeEventListener('popstate', checkTrackingState);
      observer.disconnect();
      clearInterval(intervalCheck);
    };
  }, [checkTrackingState]);

  // This component renders nothing visible - it's purely for loading tracking assets
  return null;
}

export default PhoenixTracker;