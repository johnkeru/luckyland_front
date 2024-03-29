export default ({ duration, cottagePrice, roomPrice, amenities }) => {
    let amenitiesSum = 0;
    amenities.forEach(atc => {
        amenitiesSum += (atc.price * atc.quantity);
    });

    const totalRoomPrice = parseInt(roomPrice) * duration;
    const totalPayment = totalRoomPrice + (parseInt(cottagePrice)) + amenitiesSum;

    return totalPayment;
}
