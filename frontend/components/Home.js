import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TextField, TablePagination
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Autocomplete from '@mui/material/Autocomplete';

const Home = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (page = 0, rowsPerPage = 10, filters = {}) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    let query = `${backendUrl}/datos_personales/?skip=${page * rowsPerPage}&limit=${rowsPerPage}`;

    // Add filters to the query
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query += `&${key}=${encodeURIComponent(filters[key])}`;
      }
    });

    try {
      const response = await axios.get(query);
      console.log("Data fetched from server:", response.data); // Verify the server response
      setData(response.data); // Assuming the response is a list
      setTotalRows(response.data.length); // Adjust according to the actual total rows if available
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when page, rowsPerPage, or filters change
  useEffect(() => {
    fetchData(page, rowsPerPage, filters);
  }, [page, rowsPerPage, filters]);

  // Handle filter change with debounce
  const handleFilterChange = useCallback(debounce((key, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [key]: value };
      fetchData(0, rowsPerPage, newFilters); // Call fetchData to update the data
      return newFilters;
    });
    setPage(0);
  }, 300), [rowsPerPage]); // Adjust the delay as needed

  // Toggle filter visibility
  const toggleFilterVisibility = (key) => {
    setShowFilters({ ...showFilters, [key]: !showFilters[key] });
  };

  // Get unique values for a column
  const getUniqueValues = (key) => {
    return Array.from(new Set(data.map(item => item[key]))).filter(Boolean);
  };

  const columns = [
    'cod_emp', 'cedula', 'grado_militar', 'apellido1', 'apellido2', 'nombre1', 'nombre2',
    'ubicacion', 'ubicacion_detallada', 'cargo', 'tipo_emp', 'categoria', 'sueldo',
    'fecha_nacim', 'sexo', 'estado_civil', 'nivel_instruccion', 'direccion', 'ciudad',
    'estado', 'telefono_cel', 'telefono_ofi', 'correo', 'ciudad_origen', 'estados_origen',
    'vivienda', 'discapacidad', 'riesgo'
  ];

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Datos Personales</h1>
      <TableContainer component={Paper}>
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((key) => (
                  <TableCell key={key}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>{key.replace('_', ' ')}</span>
                      <IconButton onClick={() => toggleFilterVisibility(key)}>
                        <FilterListIcon />
                      </IconButton>
                    </div>
                    {showFilters[key] && (
                      <Autocomplete
                        options={getUniqueValues(key)}
                        onInputChange={(event, value) => handleFilterChange(key, value)}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" size="small" />
                        )}
                        value={filters[key] || ''}
                        freeSolo
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((key) => (
                      <TableCell key={key}>{item[key]}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
