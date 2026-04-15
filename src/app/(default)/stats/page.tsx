"use client";

import ErrorModal from "@/components/error/error-modal/error-modal";
import Image from "@/components/image/image";
import Link from "next/link";
import { useState } from "react";

export default function Stats() {
    const [error, setError] = useState<string>("");

    return (
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h1>Stats</h1>
            <Image src={"/character/stats.png"} alt={"Coming Soon"} />
            <p>Stats are coming soon!</p>
            <Link href={"/info/setting-goals"}>Learn more about setting goals</Link>
            <button onClick={() => setError("Failed to update stats")}>ERROR</button>
            {error && <ErrorModal error={error} closeModal={() => setError("")} />}
        </div>
    )
}