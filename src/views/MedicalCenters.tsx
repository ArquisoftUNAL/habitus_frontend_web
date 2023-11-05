import BlueButton from "../components/BlueButton";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import LoadingView from "./LoadingView";

import { MEDICAl_CENTERS } from "../graphql/MedicalCentersQueries";

import "./../styles/GeneralStyles.css";
import "./../styles/MedicalCenters.css";

interface MedicalCenterModalProps {
    onClose: () => void;
    onChoose: (medicalCenter: string) => void;
}

export const MedicalCentersView = ({ onClose, onChoose }: MedicalCenterModalProps) => {

    const [chosen, setChosen] = useState<any>({});

    const { data, loading, error } = useQuery(MEDICAl_CENTERS);

    if (loading) {
        return <LoadingView />;
    }

    if (error) {
        return <div>{JSON.stringify(error)}</div>
    }

    const medicalCentersList = data.getMedicalCenters.centers ?? [];

    return (
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12 habitus-page-title habitus-with-bottomline">
                    Medical centers
                </div>
                <div className="col-12">
                    <div className="row">
                        {
                            medicalCentersList.length > 0 ?
                                medicalCentersList.map((medicalCenter: any, index: number) => {
                                    return (
                                        <div
                                            className="col-12 col-sm-6 text-center"
                                            key={index}
                                        >
                                            <div
                                                className={
                                                    `${chosen.location === medicalCenter.location ?
                                                        "habitus-medical-center-selected" :
                                                        "habitus-medical-center"
                                                    }`}

                                                onMouseDown={() => {
                                                    setChosen(medicalCenter);
                                                }}
                                            >
                                                <div>{medicalCenter.name}</div>
                                                <div>Location: {medicalCenter.location}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="col-12 habitus-medium-text">
                                    No medical centers
                                </div>
                        }
                    </div>
                </div>
                <div className="habitus-separator" />
                <div className="col-12 col-sm-6">
                    <BlueButton
                        caption="Choose"
                        onClick={() => {
                            onChoose(chosen.location);
                        }}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <BlueButton
                        caption="Cancel"
                        onClick={() => {
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MedicalCentersView;