import AddGoalForm from "@/components/form/add-goal-form/add-goal-form";
import PageHeader from "@/components/page-header/page-header";


export default async function AddGoalPage({searchParams}: { searchParams: { year: string, period: string } }) {
    const { period, year } = await searchParams;
  return (
    <>
      <PageHeader title="Add Goal" editing={false} returnUrl={`/goals/${period.toLowerCase()}/${year}`} />
      <AddGoalForm datesMeta={{ year, period }}/>
    </>
  );
}