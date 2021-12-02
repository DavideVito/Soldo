import loadingGif from "../../Images/Loading/loading.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src={loadingGif} alt={"carico"} />
    </div>
  );
};

export default Loading;
