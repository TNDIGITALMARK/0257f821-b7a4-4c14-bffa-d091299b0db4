"use client";

import { useEffect, useState, useCallback } from 'react';

/**
 * Phoenix Tracking Client Component
 * This component handles all client-side tracking functionality
 * while keeping the layout as a Server Component.
 * 
 * Respects URL parameter ?phoenix_tracking=disabled for toggle control.
 */
export function PhoenixTracker() {
  const [shouldLoadTracking, setShouldLoadTracking] = useState(true); // DEFAULT TO ENABLED

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

  // Listen for messages from parent frame to control tracking state
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'phoenix-toggle-tracking') {
        const enabled = event.data.enabled;
        console.log('🎯 PhoenixTracker: Received tracking toggle from parent:', enabled);
        setShouldLoadTracking(enabled);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Check on mount
  useEffect(() => {
    checkTrackingState();
  }, [checkTrackingState]);

  useEffect(() => {
    if (!shouldLoadTracking) {
      console.log('🚫 PhoenixTracker: Skipping tracking load - disabled');
      return;
    }

    console.log('🎯 PhoenixTracker: Loading tracking assets...');

    // Load tracking styles dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/phoenix-tracking.css';
    link.id = 'phoenix-tracking-styles';
    document.head.appendChild(link);

    // Load tracking script dynamically
    const script = document.createElement('script');
    script.src = '/phoenix-tracking.js';
    script.async = true;
    script.id = 'phoenix-tracking-script';
    document.body.appendChild(script);

    console.log('✅ PhoenixTracker: Tracking assets loaded');

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
  }, [shouldLoadTracking]);

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