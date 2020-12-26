import React from 'react';
 
function HomePage() {
  return (
    <div>
      <h2>Welcome to Loftu!</h2> 
      <p>We encourage sharing items. Please provide us feedback positive or negative after using the system.</p>
      <table border="1">
        <tr>
          <th>Page</th>
          <th>Issues</th>
          <th>Remarks</th>
        </tr>
        <tr>
          <td>Signin</td>
          <td><li>Check password begins with alphabet</li>
          <li>Password should be 6 characters</li>
          <li>if firebase fails, delete the memberId from loftu_members</li>
          </td>
          <td> If delete works then no need to check for password</td>
        </tr>

      </table>
    </div>
  );
}
 
export default HomePage;