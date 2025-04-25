import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "700",
            top: "-90px",
            left: "-120px",
          }}
        >
          <Image src={assets.svgs.grid} alt="grid" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Healthier Hearts
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Come from{" "}
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          color="primary.main"
          fontWeight={400}
        >
          Preventive Care
        </Typography>
        <Typography sx={{ my: 4 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni,
          soluta nihil? Fugit aut sit et, ad, incidunt inventore in mollitia cum
          illo eius eligendi distinctio quisquam corrupti at? Porro, eligendi.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button>Make Appointment</Button>
          <Button
            variant="outlined"
            sx={{
              marginLeft: "5px",
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          marginTop: 0,
        }}
      >
        <Box sx={{ position: "absolute", left: "200px", top: "-30px" }}>
          <Image src={assets.svgs.arrow} alt="arrow" width={100} height={100} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box mt={4}>
            <Image
              src={assets.images.doctor1}
              alt="doctor1"
              width={240}
              height={380}
            />
          </Box>
          <Box>
            <Image
              src={assets.images.doctor2}
              alt="doctor2"
              width={240}
              height={380}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "220px",
            left: "150px",
          }}
        >
          <Image
            src={assets.images.doctor3}
            alt="doctor3"
            width={240}
            height={240}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: "-50px",
            zIndex: -1,
          }}
        >
          <Image
            src={assets.images.stethoscope}
            alt="doctor3"
            width={180}
            height={180}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
