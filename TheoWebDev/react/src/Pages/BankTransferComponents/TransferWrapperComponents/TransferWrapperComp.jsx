import React from 'react';
import styles from './TransferWrapperComp.module.css'; // Ensure this is the correct path
import GcashTransferComp from '../GCashTransferComp/GcashTransferComp';
import PaymayaTransferComp from '../PayMayaTransferComp/PayMayaTransferComp';
import BancNetTransferComp from '../BancNetTransferComp/BancNetTransferComp';
import { useNavigate } from 'react-router-dom';

function TransferWrapperComp() {
  const navigate = useNavigate();
  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.authWrapper}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ←Back
        </button>
        <div className={styles.transferWrapperContainer}>
          {/* New container for the top row (GCash and PayMaya) */}
          <div className={styles.topRowContainer}>
            <GcashTransferComp />
            <PaymayaTransferComp />
          </div>
          {/* BancNetTransferComp is now a direct child, will be placed below the topRowContainer */}
          <BancNetTransferComp />
        </div>
      </div>
    </div>
  );
}

export default TransferWrapperComp;