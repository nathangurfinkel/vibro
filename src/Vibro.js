import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Box,
  useTheme,
  CardActions,
  Tooltip,
  Container,
  CardMedia,
  CardHeader,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import VibrationIcon from "@mui/icons-material/Vibration";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import ScreenLockPortraitOutlinedIcon from "@mui/icons-material/ScreenLockPortraitOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import RefreshIcon from "@mui/icons-material/Refresh";

export function SecondsTimePicker({ vibrateAt, setVibrateAt, currentTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          ampm={false}
          openTo="hours"
          views={["hours", "minutes", "seconds"]}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="Vibrate at"
          value={(vibrateAt && dayjs(vibrateAt)) || null}
          onChange={(newValue) => {
            setVibrateAt(newValue);
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
export default function Vibro() {
  // mui theme to change the color of all the typography fonts
  const theme = useTheme();
  const typography = theme.typography;
  typography.h6 = {
    ...typography.h6,
    color: "#f07173",
  };

  const MINUTE_MS = 60000;

  const [timesOfVibration, setTimesOfVibration] = useState([]);

  const [started, setStarted] = useState(false);

  const [currentTime, setCurrentTime] = useState(dayjs());

  const [vibrateAt, setVibrateAt] = useState(null);

  const [vibroInterval, setVibroInterval] = useState(0);

  const [wakeLocked, setIsWakeLocked] = useState(false);

  const [vibrateStatus, setVibrateStatus] = useState("off");

  const [vibrateLength, setVibrateLength] = useState(0);

  const [wakeLock, setWakeLock] = useState(
    navigator.wakeLock.request("screen")
  );

  // just a clock
  useEffect(() => {
    setInterval(() => {
      var now = dayjs();
      setCurrentTime(now);
    }, 1000);
  }, []);

  async function handleVibrate() {
    console.log("vibrate");
    setTimesOfVibration([...timesOfVibration, new Date().getTime()]);
    navigator.vibrate(vibrateLength);
    setVibrateStatus("on");
    setTimeout(() => {
      setVibrateStatus("off");
    }, vibrateLength);
    setVibrateAt(dayjs(vibrateAt).add(vibroInterval, "minute"));
  }
  // vibrate if time is right
  useEffect(() => {
    if (
      vibrateAt &&
      started &&
      vibrateStatus === "off" &&
      vibrateAt.isSame(currentTime, "second")
    ) {
      handleVibrate();
    }
  }, [currentTime]);

  const handleWakeLock = async (toggle) => {
    if (toggle) {
      try {
        setWakeLock(await navigator.wakeLock.request("screen"));
        setIsWakeLocked(true);
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      try {
        wakeLock.release();
        setIsWakeLocked(false);
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  };

  return (
    // <Box
    //   sx={{
    //     // gradient background
    //     backgroundImage: `linear-gradient(45deg, #f7c8d5 0%, #f7c6d2 100%)`,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",

    //   }}
    // >
    <Card
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          width: "80%",
          margin: "10px auto",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(45deg, #fdf0f4 0%, #f5bdcd 100%)`,
        },
        [theme.breakpoints.up("md")]: {
          width: "50%",
          margin: "10px auto",

          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(45deg, #fdf0f4 0%, #f5bdcd 100%)`,
        },
        [theme.breakpoints.up("xl")]: {
          width: "30%",
          margin: "10px auto",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(45deg, #fdf0f4 0%, #f5bdcd 100%)`,
        },
      })}
    >
      {/* card header with logo */}

      {/* cardheader with refresh button */}

      <img
        src="vibrapp.png"
        alt="logo"
        style={{
          width: "100%",
          height: "auto",
        }}
        onClick={() => {
          window.location.reload();
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} justifyContent="space-between" alignItems="stretch">
          <Stack>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">current time:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">
                  {currentTime.format("HH:mm:ss")}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">vibrate at: </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">
                  {vibrateAt ? vibrateAt.format("HH:mm:ss") : "not set"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6"> vibrate every:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">
                  {vibroInterval ? vibroInterval + " minutes" : "not set"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6"> vibrate for:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">
                  {vibrateLength ? vibrateLength + " ms" : "not set"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6"> vibrator status:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                {vibrateStatus === "off" ? (
                  <Typography variant="h6">{vibrateStatus}</Typography>
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    image="ren.gif"
                    alt="ren"
                  />
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">keep awake status:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">
                  {wakeLocked ? "on" : "off"}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">doing now:</Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h6">
                  {started ? "running" : "waiting for start"}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <SecondsTimePicker
            sx={{ width: "100%" }}
            vibrateAt={vibrateAt}
            setVibrateAt={setVibrateAt}
            currentTime={currentTime}
          />
          <TextField
            fullWidth
            label="Interval"
            value={vibroInterval}
            onChange={(e) => {
              setVibroInterval(e.target.value);
            }}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVibroInterval(0)}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">minutes:</InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Vibration Length"
            value={vibrateLength}
            onChange={(e) => {
              setVibrateLength(e.target.value);
            }}
            type="number"
            inputProps={{
              step: 10,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVibrateLength(0)}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">ms:</InputAdornment>
              ),
            }}
          />

          <CardActions
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <IconButton
              disabled={
                vibrateAt === null || vibroInterval === 0 || vibrateLength === 0
              }
              onClick={() => {
                setStarted(!started);
              }}
            >
              {!started ? (
                <>
                  <Tooltip title="Start">
                    <AlarmOnIcon fontSize="large" />
                  </Tooltip>
                  {/* run */}
                </>
              ) : (
                <>
                  <Tooltip title="Stop">
                    <AlarmOffIcon fontSize="large" sx={{ color: "red" }} />
                  </Tooltip>
                  {/* stop */}
                </>
              )}
            </IconButton>

            <IconButton
              disabled={vibrateLength === 0}
              onClick={() => {
                handleVibrate();
              }}
            >
              {vibrateStatus === "on" ? (
                <>
                  <VibrationIcon fontSize="large" sx={{ color: "pink" }} />
                  {/* test */}
                </>
              ) : (
                <>
                  <VibrationIcon fontSize="large" sx={{ color: "grey" }} />
                  {/* test */}
                </>
              )}
            </IconButton>

            <IconButton
              disabled={
                vibrateAt === null || vibroInterval === 0 || vibrateLength === 0
              }
              size="large"
              onClick={() => {
                handleWakeLock(!wakeLocked);
              }}
            >
              {!wakeLocked ? (
                <>
                  <SmartphoneOutlinedIcon sx={{ color: "grey" }} />
                  {/* wake lock */}
                </>
              ) : (
                <>
                  <ScreenLockPortraitOutlinedIcon sx={{ color: "red" }} />
                  {/* release */}
                </>
              )}
            </IconButton>

            <IconButton
              disabled={
                vibrateAt === null || vibroInterval === 0 || vibrateLength === 0
              }
              onClick={() => download("vibro.txt", timesOfVibration)}
            >
              <>
                <FileDownloadOutlinedIcon sx={{ color: "grey" }} />
                {/* txt log */}
              </>
            </IconButton>
          </CardActions>
          {(vibrateAt === null ||
            vibroInterval === 0 ||
            vibrateLength === 0) && (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              fill the above to activate controls
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
    // </Box>
  );
}
