"use client";
import HDatePicker from "@/components/forms/HDatePicker";
import HForm from "@/components/forms/HForm";
import HTimePicker from "@/components/forms/HTimePicker";
import HModal from "@/components/shared/Modal/HModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    // console.log(values);
    try {
      const res = await createSchedule(values).unwrap();
      // console.log(res);
      if (res?.length) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <HModal open={open} setOpen={setOpen} title="Create Schedule">
      <HForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width: "400px" }}>
          <Grid size={{ md: 12 }}>
            <HDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid size={{ md: 12 }}>
            <HDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid size={{ md: 6 }}>
            <HTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid size={{ md: 6 }}>
            <HTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </HForm>
    </HModal>
  );
};

export default ScheduleModal;
