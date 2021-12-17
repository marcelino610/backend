const persMethod = 'mongodb' //para cambiar persistencia, modificar esta variable ('file', 'firebase', 'memory', 'mongodb')

export default {
    method: persMethod,
    file: {
        path: '../db/'
    },
    firebase: {
        "type": "service_account",
        "project_id": "curso-backend-b7af5",
        "private_key_id": "8f8e015f28c010c29e4aaaeba4c3bf61bf5d1423",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1yfJvpoDv6/Q0\nT5vanmaMu8TUxBEFdjteL5SrynJyM/wylMn2/ySZ84V/038eg8sIf3uVihkThg35\ni4nOte/gmxBZa72M9SeNB/8jxI6KyPXyVYLkSOsXceWu0NCHF7yOuVmcgtM9Z1U3\nWl76eqfN7fkuOWd108u57l7WycutYWs/Uzdzkwr9RYl4JKOmPN2K2MAvwOMWpQXA\nFbGwtWy9GXb3HQcBXaOIe4yL5zWqB0QYCSdsuVXpcuEpwTSWnkqJe3tup2MpgtYz\n2+LLZF9lomJFEV9CutRhYvqTeT5s2AfkBCnAMaa6Fchh1qbqWx36el1N3MuMb9+S\n6nX6dyf5AgMBAAECggEABjNuyR8xW729NUGX6+OmVNuc0bMkb37CdKqD1D5SHBIo\n4qLPptS6L2QupBcXSXeuZ8pNcWLmCxPyCxaW602qcotnid1SeGnuYPGqYtJ0GEjV\nluAS2G2iU0jn0EhALLODE41AAMY3pWsObZZwEfQ4IB6jds+vd0Xzt5JpesMkZvQS\nYjxEw8wgm5fKCd13ROXp8QoV5xBbjkmczWQ42UN1Eoda+h3ipcJZHmc6HuM++9y2\nbchfnZdMe5pqZQyL+xSts4S3k+vIWoMm3W5VoqVAzr0p5VCrdT98B1OJSf/irlu7\nXWKP2saqtrW71rgymBqM2nVxc3WboboXY52HQtkF9wKBgQD4qTUFAwt8vuQ4Pcj4\ntn0+MpOZqBZs6C7qnG8lSK3D8Oqy0mHp4pBTXcpcnW/JDOw3iRHgP1vY8kCwURHH\n4SZVxM36YsUKJUOJuegmhf/fnN9MreeMHS8Fzl8S72We0vnYjgzthV9JYPk34kb/\nKUFimvAYQYeXIGqEPMvBpkvgTwKBgQC7J3pwf+MQiZJQo0EHBdRA7pGnV9NjJ74u\n8zUmfS4nzBORaotF7buFGf2RBxpHyNQEFbdjz2ow4ZBwAYROWPqWGTMiCi6yw1+b\nMky04xfzY4iNJbpeouPlJ9IxGUN4aKLXFohMn8PSgwfGNicCW+jIBrL9i1L2FkfD\nPF0D38nZNwKBgE7mid9EPxHfFFVQLYPVi9n/fFwmPK9j4Pcqmg3PiOuCd0Y0gUMQ\nU9FQElTe08iMpCte/+AS2pb1D1ei8axloZ9XajBHxNPaTRrXdXU70Zvnj+cpyy3n\nWLNT71D3y1vg/8waDroTNs/2yD1WPEbclVWvaf2YVWi7rXC2RcT1el/7AoGAFMIT\nNYkpwTrRDLqeys2dtjn/08TNAHF3CbQWEBfQV7+t5/IeUnpE00WHt19HTfD7exyB\ng8OMrrFGGPZCG4KJAL74yezBMziyUP9qPKH3lRpUGfu2SSreBhu9l46Kyj8o2Jx6\nL62ExcOcyCJXf058ajs7/R1H7V2ZRhFa68QVmk8CgYBpxjVtzcQTrVI6ELf1wtMP\n3Rwh7UItNK2X7JIW9IzStQzq1tXQwyr8xu4KrnzQRFl+v2G+z7rdWwUxN0Ir/ieC\nvLJWHMxH9NyT6kYa+Mk1XhcARywWAGPHZD57zA6bKdtCBqMYd2fcibVWmPXfWePI\n15iTO9eZIMlZp6XPqg5ufQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-zzo9f@curso-backend-b7af5.iam.gserviceaccount.com",
        "client_id": "113742797607227419263",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zzo9f%40curso-backend-b7af5.iam.gserviceaccount.com"
      },
    memory: {

    },
    mongodb: {
        URI: 'mongodb://localhost:27017',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}