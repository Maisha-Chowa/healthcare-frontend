"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import assests from "@/assets";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { register } from "module";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import HForm from "@/components/forms/HForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import HInput from "@/components/forms/HInput";

// const Item = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// interface IPatientData {
//   name: string;
//   email: string;
//   contactNumber: string;
//   address: string;
// }

// interface IPatientRegisterFormData {
//   password: string;
//   patient: IPatientData;
// }
export const patientZodValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  address: z.string().min(1, "Please enter your address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  patient: patientZodValidationSchema,
});

export const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const Register = () => {
  const router = useRouter();
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<IPatientRegisterFormData>();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Container
      sx={{
        padding: "50px",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image
                src={assests.svgs.logo}
                width={50}
                height={50}
                alt="logo"
              />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <Box>
            <HForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} m={1}>
                <Grid size={{ xs: 12 }}>
                  <HInput label="Name" fullWidth={true} name="patient.name" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <HInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <HInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <HInput
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <HInput
                    label="Address"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography>
                Do you already have an account?{" "}
                <Link href="/login" style={{ color: "blue" }}>
                  Login
                </Link>
              </Typography>
            </HForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
