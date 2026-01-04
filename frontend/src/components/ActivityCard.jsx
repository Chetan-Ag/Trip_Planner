const ActivityCard = ({ activity, onAdd }) => {
  return (
    <div className="card" style={{ border: '1px solid #ddd' }}>
      <h4>{activity.name}</h4>
      <p><strong>Location:</strong> {activity.location}</p>
      <p><strong>Cost:</strong> ${activity.cost}</p>
      <p><strong>Duration:</strong> {activity.duration}</p>
      <p>{activity.description}</p>
      {onAdd && (
        <button onClick={() => onAdd(activity)} className="btn btn-primary" style={{ marginTop: '10px' }}>
          Add to Trip
        </button>
      )}
    </div>
  )
}

export default ActivityCard