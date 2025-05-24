import React, { JSX } from 'react';

interface Props {
    score: number;
}

const PredictionBar = ({ score }: Props): JSX.Element => {
    return (
        <div className="mt-3">
            <label>Success Prediction:</label>
            <div className="progress">
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${score}%` }}
                >
                    {score}%
                </div>
            </div>
        </div>
    );
};

export default PredictionBar;
