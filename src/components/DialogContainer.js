import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function DialogContainer({ open, handleClose, title, content, buttons }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {
                title && <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
            }
            {
                content && <DialogContent>
                    {content}
                </DialogContent>
            }
            {
                buttons && <DialogActions>
                    {
                        buttons.map(({ title, variant = "contained", cb, loading }, i) => {
                            return <LoadingButton key={i} loading={loading} onClick={cb} variant={variant} sx={{ textTransform: 'none' }}>{title}</LoadingButton>
                        })
                    }
                </DialogActions>
            }
        </Dialog>
    )
}
