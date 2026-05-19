import styles from "../loading.module.css";

export default function LoadingSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.shimmer}></div>
        </div>
    );
}