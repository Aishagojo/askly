// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;

// backend/middleware/auth.js
const admin = require('../firebaseAdmin');

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
}

module.exports = authenticateToken;# Code Citations

## License: unknown
https://github.com/svalentinaog/SpootChat-CLIENT/tree/f5bfffe917857b911fb0017fa67596d828ffbb3a/context/AuthContext.jsx

```
firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe
```

