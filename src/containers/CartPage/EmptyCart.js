import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyle = makeStyles({
  component: {
    width: "80%%",
    height: "65px",
    background: "#fff",
    margin: "30px 140px 120px",
  },
  image: {
    width: "20%",
    marginBottom: 20,
  },
  container: {
    // textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

const EmptyCart = () => {
  const imgurl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";
  const classes = useStyle();

  return (
    <Box className={classes.component}>
      <Box className={classes.container}>
        <img src={imgurl} className={classes.image} />
        <Typography>Giỏ của bạn đang trống!</Typography>
        <span>
          <a href="/" style={{ color: "#2874f0" }}>
            Mua sắm ngay bây giờ.
          </a>
        </span>
      </Box>
    </Box>
  );
};

export default EmptyCart;
