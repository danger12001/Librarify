ALTER TABLE `info`
  ADD CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
