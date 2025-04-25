import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TopRatedDoctors = async () => {
  const res = await fetch("http://localhost:5001/api/v1/doctor?page=1&limit=3");
  const { data: doctors } = await res.json();
  console.log(doctors);
  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20,20,20,0.1)",
        clipPath: "polygon(0 0,100% 25%,100% 100%, 0 75%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography component="h1" variant="h4" fontWeight={700}>
          Our Top Rated Doctors
        </Typography>
        <Typography
          component="p"
          fontSize={18}
          fontWeight={400}
          sx={{
            mt: 2,
          }}
        >
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          and top quality surgery facilities right here
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {doctors.map((doctor: any) => (
            <Grid item key={doctor.id} md={4}>
              <Card>
                <Box>
                  <Image
                    src={doctor.profilePhoto}
                    alt="doctor"
                    width={500}
                    height={100}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <LocationOnIcon /> {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    paddingBottom: "20px",
                  }}
                >
                  <Button>Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
