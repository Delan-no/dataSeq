import React from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

interface PerformanceIndicatorProps {
  sequences: any[];
  className?: string;
}

export default function PerformanceIndicator({ sequences, className = '' }: PerformanceIndicatorProps) {
  const { metrics, updateMetrics, getPerformanceStatus, getOptimizationTips } = usePerformanceMonitor();
  
  // Mise à jour des métriques quand les séquences changent
  React.useEffect(() => {
    updateMetrics(sequences);
  }, [sequences, updateMetrics]);

  const { status, color } = getPerformanceStatus();
  const tips = getOptimizationTips();

  const colorClasses = {
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-300',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300'
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-3 border ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 bg-${color}-500 rounded-full animate-pulse`}></div>
          <span className="font-semibold text-sm">Performance: {status}</span>
        </div>
        <div className="text-xs opacity-75">
          {metrics.totalElements} éléments
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="font-medium">{metrics.sequenceCount}</div>
          <div className="opacity-75">Séquences</div>
        </div>
        <div>
          <div className="font-medium">{metrics.memoryUsage}KB</div>
          <div className="opacity-75">Mémoire</div>
        </div>
        <div>
          <div className="font-medium">{metrics.renderTime}ms</div>
          <div className="opacity-75">Rendu</div>
        </div>
      </div>

      {tips.length > 0 && (
        <div className="mt-2 pt-2 border-t border-current/20">
          <div className="text-xs font-medium mb-1">Optimisations:</div>
          {tips.map((tip, index) => (
            <div key={index} className="text-xs opacity-75">• {tip}</div>
          ))}
        </div>
      )}
    </div>
  );
}