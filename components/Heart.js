import { useState } from "react";
import { MotionBox } from "./MotionElements"


const HeartText = ({onClick=()=>{}, hideOnClick, ...rest}) => {

    const [animateState, setAnimateState] = useState('getAttention')

    const clickHandler = () => {
        onClick();
        if (hideOnClick) {
            setAnimateState('hide')
        }
    }

    return (
        <MotionBox
            zIndex='1'
            onClick={clickHandler}
            initial='getAttention'
            animate={animateState}
            variants={{
                getAttention: {
                    opacity: 1,
                    scale: [0.7, 0.9, 0.7],
                    transition: {
                        repeat: Infinity,
                        times: [0, 0.5, 1],
                        duration: 2,
                    }
                },
                hide: {
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    type: "tween",
                }
            }}

            {...rest}
        >
            <svg viewBox="0 0 32 29.6"
                style={{
                    fill: 'red',
                    position: 'relative',
                    width: '100%'
                }}
            >
                <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
            </svg>
        </MotionBox>
    )
}

export default HeartText;