import * as React from 'react';
import { useState } from 'react';
import { Token } from "../Main"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { WalletBalance } from './WalletBalance';

interface YourWalletProps {
    supportedTokens: Array<Token>
}

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }

    return (
        <div>                <h1>  Your Wallet</h1>

            <Box >

                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList aria-label='stake form tabs' onChange={handleChange}>
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name} value={index.toString()} key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div>
                                    1. wallet balance
                                    2. big stake button
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                </div>

                            </TabPanel>
                        )
                    })
                    }

                </TabContext>
            </Box>
        </div>
    )
}