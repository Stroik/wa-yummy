'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const Refresh = ({ queryKey, tooltip }: { queryKey: string; tooltip?: string }) => {
  const [loading, setLoading] = useState(false);
  const query = useQueryClient();

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleRefresh = async () => {
    setLoading(true);
    query.invalidateQueries({ queryKey: [queryKey] });
    await timer(2500);
    setLoading(false);
  };

  return (
    <button
      onClick={handleRefresh}
      className="btn btn-primary tooltip tooltip-top join-item"
      data-tip={tooltip || 'Actualizar'}
    >
      <span>
        {loading ? (
          <i className={`loading loading-spinner text-2xl`}></i>
        ) : (
          <i className={`ri-refresh-line text-2xl`}></i>
        )}
      </span>
    </button>
  );
};
