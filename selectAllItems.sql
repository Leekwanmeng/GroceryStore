SELECT i.item_id, i.item_name, i.description, i.item_price, c.category_name, m.merchant_name
	FROM ITEM i
LEFT JOIN CATEGORY c on (i.category_id = c.category_id)
LEFT JOIN MERCHANT m on (i.merchant_id = m.merchant_id);