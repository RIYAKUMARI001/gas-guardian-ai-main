import { Router } from 'express';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database.js';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { walletAddress, signature } = req.body;

        if (!walletAddress || !signature) {
            res.status(400).json({ success: false, error: 'Missing address or signature' });
            return;
        }

        // Verify signature
        // Message must match what is signed in frontend
        const message = "Login to GasGuard";

        // In ethers v6, verifyMessage is available directly or under utils?
        // checking package.json: "ethers": "^6.9.0"
        // verifyMessage is exported from root in v6
        const recoveredAddress = ethers.verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            res.status(401).json({ success: false, error: 'Invalid signature' });
            return;
        }

        // Upsert User
        const user = await prisma.user.upsert({
            where: { walletAddress: walletAddress.toLowerCase() },
            update: { lastActiveAt: new Date() },
            create: {
                walletAddress: walletAddress.toLowerCase(),
                lastActiveAt: new Date(),
            },
        });

        // Generate Token
        const token = jwt.sign(
            { userId: user.id, walletAddress: user.walletAddress },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: error.message || 'Login failed' });
    }
});

export default router;
