import { makeStyles } from "@rbx/ui";

export default makeStyles()(() => ({
  cellName: {
    width: "220px"
  },
  cellColor: {
    width: "100px"
  },
  colorCircle: {
    height: 60,
    width: 60,
    borderRadius: "50%",
    margin: "10px 0"
  },
  colorCircleBorder: {
    border: "1px solid rgb(255,255,255,.5)"
  }
}));