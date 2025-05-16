import HForm from "@/components/forms/HForm";
import HInput from "@/components/forms/HInput";
import HFileUploader from "@/components/forms/HFileUploader";
import HModal from "@/components/shared/Modal/HModal";

import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();

  console.log(open);

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
    const data = modifyPayload(values);
    try {
      const res = await createSpecialty(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Specialty created successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <HModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <HForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 8 }}>
            <HInput name="title" label="Title" />
          </Grid>
          <Grid size={{ sm: 12, md: 8 }}>
            <HFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </HForm>
    </HModal>
  );
};

export default SpecialtyModal;
