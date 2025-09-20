// Test RLS policies for courses table
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zuefywhhmsvgbyfykoxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZWZ5d2hobXN2Z2J5Znlrb3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTMyMTksImV4cCI6MjA3MzkyOTIxOX0.IHNrGMYhaVHXKXJaGtr88EPvkmIHiY-s9xhs6GxWRC0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRLSPolicies() {
  console.log('🔍 Testing RLS policies for courses table...');
  
  try {
    // Test 1: Check if we can read courses (should be empty due to RLS)
    console.log('1. Testing courses read...');
    const { data: courses, error: readError } = await supabase
      .from('courses')
      .select('*');
    
    if (readError) {
      console.error('❌ Read error:', readError);
    } else {
      console.log('✅ Courses read result:', courses);
    }
    
    // Test 2: Check RLS policies
    console.log('2. Checking RLS policies...');
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_rls_policies', { table_name: 'courses' });
    
    if (policiesError) {
      console.log('⚠️ Could not check policies via RPC:', policiesError.message);
      
      // Try alternative approach
      console.log('3. Trying alternative policy check...');
      const { data: policyCheck, error: policyError } = await supabase
        .from('pg_policies')
        .select('*')
        .eq('tablename', 'courses');
      
      if (policyError) {
        console.log('⚠️ Could not check policies:', policyError.message);
      } else {
        console.log('✅ RLS policies:', policyCheck);
      }
    } else {
      console.log('✅ RLS policies:', policies);
    }
    
    // Test 3: Check if we can see the table structure
    console.log('4. Checking table structure...');
    const { data: columns, error: columnsError } = await supabase
      .from('courses')
      .select('*')
      .limit(0);
    
    if (columnsError) {
      console.error('❌ Table structure error:', columnsError);
    } else {
      console.log('✅ Table accessible');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testRLSPolicies();
