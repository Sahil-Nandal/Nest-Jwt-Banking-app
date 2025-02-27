import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAccount,
  getAccountsByUserId,
  deleteAccountsByAccountNumber,
  updateAccountStatus,
  createTransaction,
} from "../api/authApi";
import "./Dashboard.css";

const Dashboard = () => {
  const [userId, setUserId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteAccountNumber, setDeleteAccountNumber] = useState("");

  const [updateAccNumber, setupdateAccNumber] = useState("");
  const [updateAccStatus, setupdateAccStatus] = useState("");

  const [transactionUserID, settransactionUserID] = useState("");
  const [transactionAccNumber, settransactionAccNumber] = useState("");
  const [transactionAmount, settransactionAmount] = useState("");
  const [transactionType, settransactionType] = useState("");

  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const navigate = useNavigate();

  const fetchAccountsByUserId = async () => {
    try {
      const data = await getAccountsByUserId(searchUserId);
      setAccounts(data);
      setCurrentPage(1); // Reset to first page when fetching new data
    } catch (err) {
      console.error("Error fetching accounts", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccount(userId, accountNumber);
      alert("Account created successfully");
      fetchAccountsByUserId(userId);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    try {
      await deleteAccountsByAccountNumber(deleteAccountNumber);
      alert("Account deleted successfully");
      fetchAccountsByUserId(userId);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();
    try {
      await updateAccountStatus(updateAccNumber, updateAccStatus);
      alert("Account status updated successfully");
      fetchAccountsByUserId(userId);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const transaction = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(transactionUserID, transactionAccNumber, transactionAmount, transactionType);
      alert("Transaction is Successful");
      fetchAccountsByUserId(userId);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  // Pagination Implementation
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedAccounts = accounts.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nextPage = () => {
    if (indexOfLastRecord < accounts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="DashboardDiv">
      <h2 className="logo AppHeading">NestJS Banking Application</h2>

      <div className="createDeleteDiv">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="createAccForm" onSubmit={handleSubmit}>
          <h2 className="logo">Create Account</h2>
          <input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <button className="login" type="submit">
            Create Account
          </button>
        </form>

        <form className="deleteAccForm" onSubmit={deleteAccount}>
          <h2 className="logo">Delete Account</h2>
          <input
            placeholder="User ID"
            value={deleteUserId}
            onChange={(e) => setDeleteUserId(e.target.value)}
            required
          />
          <input
            placeholder="Account Number"
            value={deleteAccountNumber}
            onChange={(e) => setDeleteAccountNumber(e.target.value)}
            required
          />
          <button className="deleteAccBtn" type="submit">
            Delete Account
          </button>
        </form>

        <form className="UpdateAccForm" onSubmit={updateAccount}>
          <h2 className="logo">Update Account Status</h2>
          <input
            placeholder="Account number"
            value={updateAccNumber}
            onChange={(e) => setupdateAccNumber(e.target.value)}
            required
          />
          <select
            className="selectAccStatus"
            value={updateAccStatus}
            onChange={(e) => setupdateAccStatus(e.target.value)}
            required
          >
            <option value="">Select Account Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Dormant">Dormant</option>
            <option value="Closed">Closed</option>
          </select>
          <button className="updateAccBtn" type="submit">
            Update Account
          </button>
        </form>

        
        <form className="UpdateAccForm" onSubmit={transaction}>
          <h2 className="logo">Transaction</h2>
          <input
            placeholder="UserId"
            value={transactionUserID}
            onChange={(e) => settransactionUserID(e.target.value)}
            required
          />
          <input
            placeholder="Account number"
            value={transactionAccNumber}
            onChange={(e) => settransactionAccNumber(e.target.value)}
            required
          />
          <input
            placeholder="Amount"
            value={transactionAmount}
            onChange={(e) => settransactionAmount(e.target.value)}
            required
          />
          <select
            className="selectAccStatus"
            value={transactionType}
            onChange={(e) => settransactionType(e.target.value)}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="credit">credit</option>
            <option value="debit">debit</option>
            
          </select>
          
          <button className="updateAccBtn" type="submit">
            Transact amount
          </button>
        </form>
      </div>

      <h2>Search Accounts by User ID</h2>
      <input
        type="number"
        placeholder="Enter User ID"
        value={searchUserId}
        onChange={(e) => setSearchUserId(e.target.value)}
      />
      <button onClick={fetchAccountsByUserId}>Search</button>

      <h2>Filtered Accounts</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Number</th>
            <th>User ID</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAccounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.accountNumber}</td>
              <td>{account.userId}</td>
              <td>{account.balance}</td>
              <td>{account.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={nextPage}
          disabled={indexOfLastRecord >= accounts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
