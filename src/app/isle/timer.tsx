"use client";

import { useEffect, useState } from 'react';

const padNumber = (num: number) => num.toString().padStart(2, '0');

const startTimer = () => {};

export default function Timer({className}) {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const timer = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;

    useEffect(() => {
        setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
    }, []);

    if (seconds === 59) {
        setSeconds(0);
        setMinutes(m => m + 1);
    }

    if (minutes === 59) {
        setMinutes(0);
        setHours(h => h + 1);
    }

    return <div className={className}>{timer}</div>;
}