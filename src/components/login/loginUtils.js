    import { useState } from "react";
    const useLoginUtils = () => {
        const [openUnableLoginModal, setOpenUnableLoginModal] = useState(false);
        const handleOpenUnableLoginModal = () => {
            setOpenUnableLoginModal(true)
        }
        const handleCloseUnableLoginModal = () => {
            setOpenUnableLoginModal(false)
        }
        return {
            openUnableLoginModal,
            handleOpenUnableLoginModal,
            handleCloseUnableLoginModal
        };
        
    }

    export default useLoginUtils;
