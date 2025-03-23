-- Default User
INSERT INTO users (name, email, role, manager, pwHash, salt, iterations) VALUES (
  'admin',
  'admin@gdesi.io',
  'admin',
  1,
  '6696d7fb5be749bf9f63c0aa8cf9f1bd06826fc6163e0716f6fcf4e101b379417d9bd739d3f682d0121605e387708bad8df81b173ee1a377dc3099afda4f84dc', 
  'flcWYd2/ngkMAIJ/hClw+UYZ9Cjj4EJ64jA9Z2EoLzJRkU43gq8OfNMXFe59AWq0ePvs0tji4SDpca6Ge7s4g9i79vzqGPJ83yp0gvZVBFLpvBAa0Fq89ccy7EURzHxDnKKWflNlgIxWR1Dl1tzmGEB6TNZn1NwArvJVYbDAYZM=',
  100000
);

INSERT INTO users (name, email, role, manager, pwHash, salt, iterations) VALUES (
  'manager',
  'manager@gdesi.io',
  'manager',
  1,
  '050531cb5dba92047925e1238dc7da5240baf32de1df4c389bff0a613bb9147673602f922bc71035536de286b0e54efe7e6fb1616fb1c84b351e0d30cf768b91', 
  '1CetKSdPosaOVOu/aPxERk8KP5qgXVDHclGeaB/P7n/mwJnHIjDBCxKlbx3PppRNScUOAOGO87VGXQ9JkoDZreWYY2xDEYSq8/kEhys9kv45x7/LqFfGJCTDGXRZ6eAMxUhcFJreoueAX/sh9pN2JuYFgcFzWfS7lXcWcbKHGhY=',
  100000
);

INSERT INTO users (name, email, role, manager, pwHash, salt, iterations) VALUES (
  'user',
  'user@gdesi.io',
  'user',
  2,
  'dcf92297ccdd10b3886664adb4564bf83e014e0f1fd82c03e9fa7d1f02f2a57f13c01cd14d056745b5e5946aec05411d23153bd9635ab0492f1ee3cfd218ef57', 
  'DSGwlVnAnACfUwk7kSwOyNXqSbOtpRofQzl8+ZSaSpeC4AkeNQdmVHPwHdA/javY26ePjbGGDS+A56qor+9N8SeC5DuQ7duVrAWWInBEhZp+TKW/sFMF+8vNyUCrYFOlJCSawdtBTKL5ZY8s82AiZL83xKon2SwSKbohIUSmjt4=',
  100000
);
