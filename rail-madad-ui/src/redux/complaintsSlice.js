import { createSlice } from "@reduxjs/toolkit";

const complaintsSlice = createSlice({
    name:"complaints",
    initialState:{
        complaints:[],
        tag:""
    },
    reducers:{
        setComplaints:(state, action) => {
            state.complaints = action.payload
        },
        setTags:(state,action) => {
            state.tag = action.payload
        },
        updateComplaintStatus: (state, action) => {
            const { complaintId, newStatus } = action.payload;
            const complaintIndex = state.complaints.findIndex(complaint => complaint._id === complaintId);
            if (complaintIndex !== -1) {
                state.complaints[complaintIndex].status = newStatus;
            }
        }
    }
});

export const {
    setComplaints,setTags,updateComplaintStatus
} = complaintsSlice.actions;

export default complaintsSlice.reducer;