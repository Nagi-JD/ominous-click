-- Simple delete for test rows
DELETE FROM scores WHERE address = 'Test123';
DELETE FROM scores WHERE address = 'DebugTest123';
DELETE FROM scores WHERE address = 'DebugPowerShell123';
DELETE FROM scores WHERE address LIKE 'Test%';

