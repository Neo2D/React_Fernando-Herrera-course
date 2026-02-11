import { useEffect, useState } from "react"

export const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
}

export const useTrafficLight = () => {
        // type TracfficLightColor = 'red' | 'yellow' | 'green'
    type TracfficLightColor = keyof typeof colors

    const [light, setLight] = useState<TracfficLightColor>('red')
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        if (countdown === 0) {
            // setCountdown(5)
            // if (light === 'red'){
            //     setLight('green')
            //     return
            // }
            // if (light === 'yellow'){
            //     setLight('red')
            //     return
            // }
            // if (light === 'green'){
            //     setCountdown(2)
            //     setLight('yellow')
            //     return
            // }
            return
        }

        const intervalId = setInterval(() => {
            setCountdown((prev) => prev -1)
        }, 1000);

        return () => {clearInterval(intervalId)}

    }, [countdown])

    //Change light color effect
    useEffect(() => {
        if (countdown > 0) return

        setCountdown(5)

        if (light === 'red'){
            setLight('green')
            return
        }

        if (light === 'yellow'){
            setLight('red')
            return
        }

        if (light === 'green'){
            setCountdown(2)
            setLight('yellow')
            return
        }
    }, [countdown, light])

    return {
        countdown,

        percentage: (countdown/5) * 100,
        redLight: light === 'red' ? colors[light] : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors[light] : 'bg-gray-500',
        greenLight: light === 'green' ? colors[light] : 'bg-gray-500'
    }
}
