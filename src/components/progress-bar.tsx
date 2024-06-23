import React from 'react';

interface ProgressBarProps {
    progress: number; // progress should be a number between 0 and 100
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="progress-bar w-full max-w-md">
            <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-800">
                <div
                    className="h-full rounded-full bg-gray-900 dark:bg-gray-50"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
            <div className="mt-2 flex justify-between text-sm font-medium text-gray-900 dark:text-gray-50">
                <span>{`${progress.toFixed(0)}%`}</span>
                {progress === 100 && <span>Completed</span>}
            </div>
        </div>
    );
}
