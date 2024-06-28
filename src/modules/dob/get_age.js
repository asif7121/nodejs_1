import moment from "moment";


export const find_age = async ( req, res ) => {
    try {
      const { dob } = req.query;

      if (!dob) {
        return res.status(400).json({ error: "Date of birth is required." });
      }
        const birthDate = moment( dob, "YYYY-MM-DD" );
        const currentDate = moment();
        if ( birthDate.isAfter( currentDate )  ) {
            return res.status(400).json({error:'Birth Date must be in past'})
        }
      if (!birthDate.isValid()) {
        return res
          .status(400)
          .json({ error: "Invalid date format. Use 'YYYY-MM-DD'." });
      }

      const age = currentDate.diff(birthDate, "years");

      return res.status(200).json({ current_age: age });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    

}