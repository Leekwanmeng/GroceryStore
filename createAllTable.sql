
-- -----------------------------------------------------
-- Schema GroceryStore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GroceryStore` DEFAULT CHARACTER SET latin1 ;
USE `GroceryStore` ;

-- -----------------------------------------------------
-- Table `GroceryStore`.`CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GroceryStore`.`CATEGORY` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`))


-- -----------------------------------------------------
-- Table `GroceryStore`.`CUSTOMER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GroceryStore`.`CUSTOMER` (
  `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `email` (`email` ASC))


-- -----------------------------------------------------
-- Table `GroceryStore`.`CUSTOMER_ORDER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GroceryStore`.`CUSTOMER_ORDER` (
  `customer_order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `total_amount` DECIMAL(13,2) NOT NULL,
  `customer_id` INT(11) NOT NULL,
  PRIMARY KEY (`customer_order_id`),
  INDEX `customer_id` (`customer_id` ASC),
  CONSTRAINT `CUSTOMER_ORDER_ibfk_1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `GroceryStore`.`CUSTOMER` (`customer_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `GroceryStore`.`MERCHANT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GroceryStore`.`MERCHANT` (
  `merchant_id` INT(11) NOT NULL AUTO_INCREMENT,
  `merchant_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`merchant_id`))



-- -----------------------------------------------------
-- Table `GroceryStore`.`ITEM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GroceryStore`.`ITEM` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_price` DECIMAL(13,2) NOT NULL,
  `item_name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `merchant_id` INT(11) NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `category_id` (`category_id` ASC),
  INDEX `merchant_id` (`merchant_id` ASC),
  CONSTRAINT `ITEM_ibfk_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `GroceryStore`.`CATEGORY` (`category_id`),
  CONSTRAINT `ITEM_ibfk_2`
    FOREIGN KEY (`merchant_id`)
    REFERENCES `GroceryStore`.`MERCHANT` (`merchant_id`))


-- -----------------------------------------------------
-- Table `GroceryStore`.`ORDER_ITEM`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GroceryStore`.`ORDER_ITEM` (
  `order_item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity` INT(11) NOT NULL,
  `total_cost` INT(11) NOT NULL,
  `customer_order_id` INT(11) NOT NULL,
  `item_id` INT(11) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  INDEX `item_id` (`item_id` ASC),
  INDEX `fk_customer_order_id` (`customer_order_id` ASC),
  CONSTRAINT `ORDER_ITEM_ibfk_2`
    FOREIGN KEY (`item_id`)
    REFERENCES `GroceryStore`.`ITEM` (`item_id`),
  CONSTRAINT `fk_customer_order_id`
    FOREIGN KEY (`customer_order_id`)
    REFERENCES `GroceryStore`.`CUSTOMER_ORDER` (`customer_order_id`))


