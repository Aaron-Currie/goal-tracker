import styles from "./panel.module.css";
import Button from "../button/button";
import IconButton from "../button/icon-button";
import { faX} from "@fortawesome/free-solid-svg-icons"
import { Overlay } from "../utility-comps/overlay";

type Goal = {
  id: string;
  title: string;
  is_completed: boolean;
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category_id: string | null;
  activity_id: string | null;
  created_at: string;
};

export default function DetailsPanel({ goal, unselect }: { goal: Goal, unselect: React.Dispatch<React.SetStateAction<Goal | null>> }) {
    return (
        <Overlay onClick={() => unselect(null)}>
            <div className={styles.panel}>
                <IconButton icon={faX} button={{alt: 'Close', style: 'default'}} onClick={() => unselect(null)} />
                <div className={styles.content}>
                    <h2>{goal.title}</h2>
                    <p>{goal.is_completed ? "COMPLETED" : "INCOMPLETE"}</p>
                    <p>Period: {goal.goal_period}</p>
                    <p>Category: {goal.category_id ? goal.category_id : "None"}</p>
                    <p>Activity: {goal.activity_id ? goal.activity_id : "None"}</p>
                    <p>I want to climb the highest mountain that I can find, so I aim to do this.</p>
                </div>
                <div className={styles.buttons}>
                    <Button button={{text: "Complete", style: "complete"}} onClick={() => {}} />
                    <Button button={{text: "Delete", style: "undo"}} onClick={() => {}} />
                    <Button onClick={() => {}} button={{text:'Edit', style: 'edit'}}/>
                </div>

            </div>
        </Overlay>
    )
}