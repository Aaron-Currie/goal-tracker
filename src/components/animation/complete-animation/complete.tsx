import { useEffect, useRef } from "react";
import styles from "./complete.module.css";
import confetti from "canvas-confetti";
import Button from "@/components/button/button";
import { Overlay } from "@/components/utility-comps/overlay";



export default function CompleteAnimation({onClose }: { onClose: () => void }) {
    const canvasRef1 = useRef<HTMLCanvasElement | any>(undefined);
    const canvasRef2 = useRef<HTMLCanvasElement | any>(undefined);

    useEffect(() => {
        if (!canvasRef1.current && !canvasRef2.current) return;

        const confettiLeft = confetti.create(canvasRef1.current, {
        resize: true,
        useWorker: true,
        });

        const confettiRight = confetti.create(canvasRef2.current, {
        resize: true,
        useWorker: true,
        });


        confettiLeft({
            origin : { x: 0.5, y: 0.6 },
            spread: 60,
            angle: 120,
            particleCount: 120
        });

        confettiRight({
            origin : { x: 0.5, y: 0.6 },
            spread: 60,
            angle: 60,
            particleCount: 120
        });
    }, []);

    return (
        <Overlay onClick={onClose}>
            <div className={styles.animationContainer} onClick={e => e.stopPropagation()}>
                <img src={"/character/mountain-celebrate.png"} alt="Complete Animation" className={styles.image} />
                <Button button={{text: "Done!", style: "complete"}} onClick={() => onClose()} />
            </div>
            <canvas
                ref={canvasRef1}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
            <canvas
                ref={canvasRef2}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
        </Overlay>
    )
}