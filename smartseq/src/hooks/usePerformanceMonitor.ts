import { useState, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  sequenceCount: number;
  totalElements: number;
  isOptimized: boolean;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    sequenceCount: 0,
    totalElements: 0,
    isOptimized: false
  });

  const measureRenderTime = useCallback((startTime: number) => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    setMetrics(prev => ({
      ...prev,
      renderTime: Math.round(renderTime * 100) / 100
    }));
    
    return renderTime;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMetrics = useCallback((sequences: any[]) => {
    const totalElements = sequences.reduce((sum, seq) => sum + seq.sequence.length, 0);
    const isOptimized = totalElements > 1000 || sequences.some(seq => seq.sequence.length > 100);
    
    // Estimation mémoire (approximative)
    const memoryUsage = Math.round((totalElements * 8 + sequences.length * 200) / 1024); // KB
    
    setMetrics(prev => ({
      ...prev,
      sequenceCount: sequences.length,
      totalElements,
      memoryUsage,
      isOptimized
    }));
  }, []);

  const getPerformanceStatus = useCallback(() => {
    if (metrics.totalElements < 100) return { status: 'excellent', color: 'green' };
    if (metrics.totalElements < 1000) return { status: 'bon', color: 'blue' };
    if (metrics.totalElements < 5000) return { status: 'moyen', color: 'yellow' };
    return { status: 'lourd', color: 'red' };
  }, [metrics.totalElements]);

  const shouldUseVirtualization = useCallback((itemCount: number) => {
    return itemCount > 100;
  }, []);

  const getOptimizationTips = useCallback(() => {
    const tips = [];
    
    if (metrics.totalElements > 5000) {
      tips.push("Considérez supprimer les anciennes séquences");
    }
    
    if (metrics.sequenceCount > 20) {
      tips.push("Trop de séquences peuvent ralentir l'application");
    }
    
    if (metrics.renderTime > 100) {
      tips.push("Temps de rendu élevé détecté");
    }
    
    return tips;
  }, [metrics]);

  return {
    metrics,
    measureRenderTime,
    updateMetrics,
    getPerformanceStatus,
    shouldUseVirtualization,
    getOptimizationTips
  };
};