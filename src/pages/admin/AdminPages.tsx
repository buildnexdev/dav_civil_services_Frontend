// Generic admin sub-page for quick scaffolding
const AdminGenericPage = ({ title, description }: { title: string; description: string }) => (
  <div>
    <h2 style={{color:'var(--primary)', marginBottom:'0.5rem'}}>{title}</h2>
    <p style={{color:'var(--text-muted)', marginBottom:'2rem'}}>{description}</p>
    <div className="dash-section">
      <p style={{color:'var(--text-muted)', textAlign:'center', padding:'3rem'}}>
        This module is ready for data integration. The CRUD interface will be connected to the backend API.
      </p>
    </div>
  </div>
);

export const AdminScholarshipsPage = () => <AdminGenericPage title="Scholarship Management" description="Review, approve and manage scholarship applications." />;
