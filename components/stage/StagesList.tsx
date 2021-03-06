import React, { useEffect } from "react";
import { Collapse, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import Button from "../base/Button";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import CreateStageModal from "../digital-stage-create-stage/CreateStageModal";
import StageCard from "./StageCard";
import { useSelector } from "../../lib/digitalstage/useStageContext/redux";
import { Groups, NormalizedState, Stages } from "../../lib/digitalstage/useStageContext/schema";
import { shallowEqual } from "react-redux";
import { Client } from "../../lib/digitalstage/common/model.client";
import { useStage } from "./useStage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 3, 3, 0),
            width: "100%"
        },
        clickable: {
            cursor: "pointer"
        },
        leftBorder: {
            borderLeft: "4px solid white"
        },
        leftBorderNormal: {
            borderLeft: "4px solid transparent"
        },
        paddingLeft: {
            paddingLeft: theme.spacing(3),
        },
        stagesList: {
            margin:theme.spacing(2,0),
            maxHeight: "calc(100vh - 190px)",
            minHeight: "calc(100vh - 840px)",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: "transparent"
            },
            "&::-webkit-scrollbar-track": {
                borderRadius: "25px"
            },
            "&::-webkit-scrollbar-thumb": {
                background: "white",
                borderRadius: "25px"
            },
            "&::-webkit-scrollbar-thumb:hover": {
                background: "white"
            }
        }
    }),
);

const StagesList = () => {
    const stages = useSelector<NormalizedState, Stages>(state => state.stages, shallowEqual);
    const groups = useSelector<NormalizedState, Groups>(state => state.groups);
    const classes = useStyles()
    const [list, setList] = React.useState(stages);
    const [checkedMyStage, setCheckedMyStage] = React.useState(true);
    const [checkedJoindedStages, setCheckedJoinedStages] = React.useState(true);
    const [currentStage, setCurrentStage] = React.useState<Client.Stage>();
    const [openCreateStageModal, setOpenCreateStageModal] = React.useState(false);
    const { handleSetStage, handleSetContext } = useStage();

    const handleMySatgeClick = () => {
        setCheckedMyStage((prev) => !prev);
    };

    const handleJoindeStagesClick = () => {
        setCheckedJoinedStages((prev) => !prev);
    };


    useEffect(() => {
        if (stages) {
            setList(stages)
            setCurrentStage(list.byId[Object.keys(list.byId)[0]]);
            handleSetStage(list.byId[Object.keys(list.byId)[0]])
        }

        setList(stages)

    }, [stages, groups]);


    return (
        <div className={classes.root}>
            <CreateStageModal
                open={openCreateStageModal}
                handleClose={() => setOpenCreateStageModal(false)}
            />
            <Typography variant="h5" className={classes.paddingLeft}>Stages</Typography>
            <div className={classes.stagesList}>
                <Grid
                    container={true}
                    alignItems='center'
                >
                    <Typography variant="h5" className={classes.paddingLeft}>My stages</Typography>
                    <div onClick={handleMySatgeClick} >
                        {!checkedMyStage ? <ExpandMoreIcon style={{ color: "#fff" }} /> : <ExpandLessIcon style={{ color: "#fff" }} />}
                    </div>
                </Grid>
                <div> {list.allIds.length > 0 && list.allIds.map((id) => {
                    const stage = list.byId[id];
                    return (
                        <div onClick={() => { setCurrentStage(stage); handleSetStage(stage) }} className={clsx(classes.clickable, {
                            [classes.leftBorder]: currentStage && currentStage._id === id,
                            [classes.leftBorderNormal]: currentStage && !(currentStage._id === id),
                        })} key={id}>
                            <Collapse in={checkedMyStage}>
                                {stage.isAdmin &&
                                <StageCard stage={stage} />
                                }
                            </Collapse>
                        </div>
                    )
                })}</div>
                <Grid
                    container={true}
                    alignItems='center'
                >
                    <Typography variant="h5" className={classes.paddingLeft}>Joined stages</Typography>
                    <div onClick={handleJoindeStagesClick}>{!checkedJoindedStages ? <ExpandMoreIcon style={{ color: "#fff" }} /> : <ExpandLessIcon style={{ color: "#fff" }} />}</div>
                </Grid>
                <div> {list.allIds.length > 0 && list.allIds.map((id) => {
                    const stage = list.byId[id];
                    return (
                        <div onClick={() => { setCurrentStage(stage); handleSetStage(stage) }} className={clsx(classes.clickable, {
                            [classes.leftBorder]: currentStage && currentStage._id === id,
                            [classes.leftBorderNormal]: currentStage && !(currentStage._id === id),
                        })} key={id}>
                            <Collapse in={checkedMyStage}>
                                {!stage.isAdmin &&
                                <StageCard stage={stage} />
                                }
                            </Collapse>
                        </div>
                    )
                })}</div>
            </div>
            <div style={{ textAlign: "right" }}>
                <Button
                    color="primary"
                    text="Create stage"
                    type="submit"
                    onClick={() => { setOpenCreateStageModal(true); handleSetContext("new") }}
                />
            </div>
        </div>);
};

export default StagesList;