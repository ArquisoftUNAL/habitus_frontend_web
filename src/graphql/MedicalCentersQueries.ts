import { gql } from '@apollo/client';

export const MEDICAl_CENTERS = gql`
    query QueryExternalService {
        getMedicalCenters {
            centers {
                id
                name
                location
            }
        }
    }
`;