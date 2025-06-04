import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../api/index';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { sendEmailVerification } from 'firebase/auth';
import LoadingHash from './LoadingHash';

export default function UserGate({ children }) {
    const [user, loadingAuth] = useAuthState(auth);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const syncVerification = async () => {
            if (user) {
                await user.reload(); // 確保拿到最新 emailVerified 狀態

                // 更新 Firestore 使用者文件中的 verified 欄位
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, { verified: user.emailVerified });

                // 尚未驗證 → 寄送驗證信並跳轉首頁
                if (!user.emailVerified && !emailSent) {
                    await sendEmailVerification(user);
                    setEmailSent(true);
                    navigate('/?reason=notVerified');
                }
            }
        };

        if (user) syncVerification();
    }, [user]);

    if (loadingAuth) {
        return (
            <div className="w-screen h-screen bg-stone-800 text-gray-100 flex flex-col items-center justify-center gap-4">
                <p className=' text-2xl'>驗證中...</p>
                <LoadingHash />
            </div>
        );
    }

    if (!user) {
        navigate("/account/login?reason=notLoggedIn");
        return null; // 或者顯示 loading 畫面以防跳轉時閃現
    }

    if (!user.emailVerified) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-stone-50 text-orange-500 text-center p-4">
                已發送驗證信到您的信箱，請點擊後重新登入。
            </div>
        );
    }

    return children;
}
