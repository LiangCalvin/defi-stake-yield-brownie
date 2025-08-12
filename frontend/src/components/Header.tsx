import { useEthers } from '@usedapp/core';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export const Header = () => {
    const theme = useTheme();

    // const classes = useStyles()
    const containerStyles = {
        padding: theme.spacing(3),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1),
    };
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined

    return (
        <div style={containerStyles}>
            <div>
                <Stack spacing={2} direction="row">

                    {isConnected ? (
                        <Button variant='outlined' color='primary' onClick={deactivate}>  Disconnect </Button>
                    ) : (
                        <Button variant='contained' color='primary' onClick={() => activateBrowserWallet()}> Connect </Button>
                    )
                    }

                </Stack>
            </div>
        </div>
    )
}