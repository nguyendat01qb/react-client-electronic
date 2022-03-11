import { makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../constant/data";

const useStyle = makeStyles({
  image: {
    width: "100%",
  },
  carousel: {
    zIndex: 0,
  },
});

const Banner = () => {
  const classes = useStyle();
  return (
    <Carousel
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          background: "#ffffff",
          color: "#494949",
        },
      }}
      className={classes.carousel}
    >
      {bannerData.map((banner) => (
        <img
          key={banner.id}
          src={banner.url}
          className={classes.image}
          alt={""}
        />
      ))}
    </Carousel>
  );
};

export default Banner;
