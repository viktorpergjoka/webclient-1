import {useStyletron} from "baseui";
import React, {useState} from "react";
import {ListItem, ListItemLabel} from "baseui/list/index";
import {Button} from "baseui/button/index";
import CreateStageModal from "./CreateStageModal";
import useStage from "../lib/useStage";
import Client from "../../server/src/model.client";
import {HeadingSmall} from "baseui/typography/index";


const StageListView = () => {
    const [css] = useStyletron();
    const {stages, joinStage, deleteStage} = useStage();
    const [isCreateStageModalOpen, setCreateStageModalOpen] = useState<boolean>();
    const [isModifyStageModalOpen, setModifyStageModalOpen] = useState<boolean>();
    const [selectedStage, setSelectedStage] = useState<Client.StagePrototype>();

    console.log(stages);

    return (
        <>
            <Button onClick={() => setCreateStageModalOpen(prevState => !prevState)}
            >Neue Stage erstellen</Button>
            <ul
                className={css({
                    width: '100%',
                    paddingLeft: 0,
                    paddingRight: 0,
                })}
            >
                {stages.map(stage => (
                    <ListItem
                        endEnhancer={() => (
                            <>
                                <Button size="compact" kind="primary" shape="pill">
                                    Ändern
                                </Button>
                                <Button
                                    onClick={() => deleteStage(stage._id)}
                                    size="compact" kind="secondary" shape="pill">
                                    Löschen
                                </Button>
                            </>
                        )}
                        sublist
                    >
                        <ListItemLabel>{stage._id} mit Name: {stage.name}</ListItemLabel>

                        <div className={css({
                            width: "100%"
                        })}>
                            <HeadingSmall>Gruppen</HeadingSmall>
                            <Button>
                                +
                            </Button>
                            <ul
                                className={css({
                                    width: '100%',
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                })}
                            >
                                {stage.groups.map(group => (
                                    <ListItem
                                        endEnhancer={() => (
                                            <>
                                                <Button size="mini" kind="primary" shape="pill"
                                                        onClick={() => joinStage(stage._id, "", "")}
                                                >
                                                    Beitreten
                                                </Button>
                                                <Button size="compact" kind="primary" shape="pill">
                                                    Ändern
                                                </Button>
                                            </>
                                        )}
                                    >
                                        <ListItemLabel>{group.name}</ListItemLabel>
                                    </ListItem>
                                ))}
                            </ul>
                        </div>
                    </ListItem>
                ))}
            </ul>
            <CreateStageModal isOpen={isCreateStageModalOpen}
                              onClose={() => setCreateStageModalOpen(false)}/>
        </>
    )
}
export default StageListView;