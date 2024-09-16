import Portador from './Portador';
import Anel from './Anel';

// Definir as associações após ambos os modelos terem sido inicializados
Portador.hasMany(Anel, { foreignKey: 'portadorId', as: 'aneis' });
Anel.belongsTo(Portador, { foreignKey: 'portadorId', as: 'portador' });

export { Portador, Anel };
