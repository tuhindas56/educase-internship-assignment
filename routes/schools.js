const router = require("express").Router()
const db = require("mysql").createConnection(process.env.DB_URL)

db.connect(function (err) {
	if (err) throw err
	console.log("Connected to MySQL on AWS RDS!")
})

router.post("/addSchool", (req, res) => {
	try {
		const { name, address, latitude, longitude } = req.body

		const [userLatitude, userLongitude] = [parseFloat(latitude), parseFloat(longitude)]

		if (!name || !address || isNaN(userLatitude) || isNaN(userLongitude)) {
			return res.status(400).json({ error: "Invalid input parameters" })
		}

		const query = "INSERT INTO schools (id, name, address, latitude, longitude) VALUES (uuid(), ?, ?, ?, ?)"

		db.query(query, [name, address, userLatitude, userLongitude], (error, result) => {
			if (error) {
				console.error("Database error:", error)
				return res.status(500).json({ error: "Database error" })
			}
			res.status(201).json(result)
		})
	} catch (err) {
		console.error("Server error:", err)
		res.status(500).json({ error: "Server error" })
	}
})

router.get("/listSchools", (req, res) => {
	try {
		const { latitude, longitude } = req.query

		const [userLatitude, userLongitude] = [parseFloat(latitude), parseFloat(longitude)]

		if (isNaN(userLatitude) || isNaN(userLongitude)) {
			return res.status(400).json({ error: "Invalid coordinates" })
		}

		// Calculating the distance between user coordinates and nearby schools using the Haversine formula, then sorting by distance in ascending order
		const query = `SELECT *, (6371 * 2 * ASIN(SQRT(POWER(SIN(RADIANS(latitude - ?) / 2), 2) + COS(RADIANS(?)) * COS(RADIANS(latitude)) * POWER(SIN(RADIANS(longitude - ?) / 2), 2)))) AS distance FROM schools ORDER BY distance ASC`

		db.query(query, [userLatitude, userLatitude, userLongitude], (error, result) => {
			if (error) {
				console.error("Database error:", error)
				return res.status(500).json({ error: "Database error" })
			}
			res.status(200).json(result)
		})
	} catch (err) {
		console.error("Server error:", err)
		res.status(500).json({ error: "Server error" })
	}
})

router.get("/listAllSchools", (req, res) => {
	try {
		const query = `SELECT * FROM schools`

		db.query(query, (error, result) => {
			if (error) {
				console.error("Database error:", error)
				return res.status(500).json({ error: "Database error" })
			}
			res.status(200).json(result)
		})
	} catch (err) {
		console.error("Server error:", err)
		res.status(500).json({ error: "Server error" })
	}
})

module.exports = router
